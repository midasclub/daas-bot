class Core {
  async receiveCommand (lobbyInstance, message) {
    try {
      message = JSON.parse(message)
      switch (message.topic) {
        case 'invitePlayer':
          await lobbyInstance.invite(message.playerId, message.lobby)
          break

        case 'kickPlayer':
          await lobbyInstance.kickFromLobby(message.playerId)
          break

        case 'sendMessageToChat':
          await lobbyInstance.sendMessageToChat(message.text)
          break

        case 'cancelLobby':
          await lobbyInstance.leaveLobby()
          break

        case 'getMembers':
          lobbyInstance.getMembers()
          break

        case 'getLobbyInfo':
          lobbyInstance.getLobbyInfos()
          break
      }
    } catch (e) {
      console.log('Error: ', e)
    }
  }
}

export default new Core()
