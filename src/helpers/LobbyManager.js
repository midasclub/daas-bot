import { SeriesType, ServerRegion, schema } from 'dota2'
import Redis from '../handlers/redis'

export default class LobbyManager {
  constructor (instance) {
    this.dota = instance
    this.CMPick = schema.lookupEnum('DOTA_CM_PICK').values
    this.ChatChannelType = schema.lookupEnum('DOTAChatChannelType_t').values
  }

  getCMPick (radiantHasFirstPick = 0) {
    if (radiantHasFirstPick) {
      return this.CMPick.DOTA_CM_GOOD_GUYS
    } else {
      return this.CMPick.DOTA_CM_BAD_GUYS
    }
  }

  getLobbyOptions (lobby) {
    return {
      game_name: lobby.name || '',
      pass_key: lobby.password || '',
      server_region: lobby.server || ServerRegion.BRAZIL,
      game_mode: lobby.gameMode || 0,
      game_version: schema.lookupEnum('DOTAGameVersion').values.GAME_VERSION_CURRENT,
      series_type: SeriesType.NONE,
      cm_pick: this.getCMPick(lobby.radiantHasFirstPick),
      allow_cheats: false,
      fill_with_bots: false,
      allow_spectating: true,
      radiant_series_wins: 0,
      dire_series_wins: 0,
      allchat: false,
      dota_tv_delay: schema.lookupEnum('LobbyDotaTVDelay').values.LobbyDotaTV_120,
      leagueid: 0
    }
  }

  async kickBotFromTeam () {
    return this.kickFromTeam(this.dota.AccountID)
  }

  async kickFromTeam (steamId) {
    return new Promise((resolve, reject) => {
      this.dota.practiceLobbyKickFromTeam(steamId, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async handleLobbyIdReceived (lobby) {
    return new Promise((resolve, reject) => {
      this.chatChannel = `Lobby_${lobby.lobby_id}`
      this.dota.joinChat(this.chatChannel)
    })
  }

  async inviteAll (lobby) {
    await lobby.players.forEach(async(it) => this.invite(it.steamId, lobby))
  }

  async invite (playerId, lobby) {
    return new Promise((resolve, reject) => {
      console.log(`Sent an invite to ${playerId} to lobby #${lobby.name}`)
      this.dota.inviteToLobby(playerId, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async startLobby (lobby) {
    return Promise.all([
      // The bot SteamId has in Instance
      this.kickBotFromTeam(),

      // Setup handlers
      // this.handleLobbyTimeout()
      this.handleLobbyIdReceived(lobby),
      // this.handleMatchIdReceived()
      // this.handleGameResultReceived()
      // this.handleMemberPositionUpdated()
      // this.handlePlayerReady()
      this.inviteAll(lobby)
    ])
  }

  async launchLobby (channel, lobby) {
    try {
      const self = this
      return new Promise((resolve, reject) => {
        const options = self.getLobbyOptions(lobby)

        self.dota.on('practiceLobbyUpdate', (lobby) => Redis.sendMessage(channel, JSON.stringify(lobby)))

        self.dota.createPracticeLobby(options, async (err) => {
          if (err) {
            console.log(`Failed to 'createPracticeLobby' ${lobby.name} - `, err)
            throw new Error(`Failed to 'createPracticeLobby' ${lobby.name}`)
          }

          await self.startLobby(lobby)

          console.log(`Lobby creation successful! \n Name: ${lobby.name}`)
          resolve()
        })
      })
    } catch (e) {
      console.log('Error in launch Lobby: ', e)
      throw new Error(e)
    }
  }

  invitePlayers (players) {
    console.log('Init invite players')
    players.forEach(player => {
      this.dota.on('lobbyInviteUpdate', (invite) => {
        console.log(JSON.stringify(invite, null, 2))
        this.dota.respondLobbyInvite(invite.group_id, true)
      })
    })

    console.log(`Players inviteds: ${players.length}`)
  }
}
