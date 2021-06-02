import { cardService } from '../../services/card-service.js';
import { boardService } from '../../services/board-service.js';
import { socketService } from '../../services/socket.service.js';

export default {
  state: {
    currBoard: null,
    currCard: null
  },
  getters: {
    getCurrBoard({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard))
    },
    getCurrCard({ currCard }) {
      return JSON.parse(JSON.stringify(currCard));
    },
    getMembers({ currBoard }) {
      return JSON.parse(JSON.stringify(currBoard.members))
    },
    getLabels({ currBoard }) {
      // can I mutate OBJ in nested ARRAY?
      // return currBoard?.labels;
      return JSON.parse(JSON.stringify(currBoard?.labels))
    }
  },
  mutations: {
    setBoard(state, board) {
      state.currBoard = board;
    },
    setCard(state, card) {
      state.currCard = card
    }
  },
  actions: {
    // BOARD
    async getBoards() {
      return await boardService.getBoards();
    },
    async getBoard(context, boardId) {
      // socketService.setup();
      // socketService.off('test-run')
      // socketService.on('test-run', () => {
      //   console.log('Running test!!');
      // })

      const board = await boardService.getBoardById(boardId);
      context.commit('setBoard', board)
    },
    async addBoard(context) {
      const newBoard = await boardService.addBoard();
      context.commit({ type: 'setBoard', board: newBoard })
      return newBoard;
    },
    async removeBoard(context, boardId) {
      const removedBoard = await boardService.removeBoard(boardId);
      console.log('removedBoard:', removedBoard)
    },
    async updateBoard(context, board = context.getters.getCurrBoard) {
      try {
        context.commit('setBoard', board)
        const updatedBoard = await boardService.updateBoard(board);
        // TODO: emit socket 'update-borad'
      } catch (err) {
        console.log('Coudn\'t update this board');
      }
    },
    // LIST
    addList(context, listTitle) {
      try {
        const currBoard = context.getters.getCurrBoard;
        const newList = boardService.getEmptyList(listTitle);
        newList.inBoard = {
          boardId: currBoard._id,
          boardTitle: currBoard.title
        }
        currBoard.lists.push(newList)
        context.dispatch('updateBoard', currBoard)
      } catch (err) {
        console.log('Coudln\'t add list', err);
      }
    },
    removeList(context, listId) {
      const currBoard = context.getters.getCurrBoard;
      const listIdx = currBoard.lists.findIndex(list => list._id === listId);
      if (listIdx === -1) throw new Error(`The list ${listId} was not found`);
      currBoard.lists.splice(listIdx, 1)
      context.dispatch('updateBoard', currBoard)
    },
    // updateList(context, list) {
    //   try {
    //     const currBoard = context.getters.getCurrBoard;
    //     const oldListIdx = currBoard.lists.findIndex(l => l._id === list._id)
    //     if (oldListIdx === -1) throw new Error(`The list ${list._id} was not found`);
    //     currBoard.lists.splice(oldListIdx, 1, list)
    //     context.dispatch('updateBoard', currBoard)
    //   } catch (err) {
    //     console.log('Coudln\'t update list', err);
    //   }
    // },
    // CARD
    getCard(context, { listId, cardId }) {
      try {
        const currBoard = context.getters.getCurrBoard;
        const currList = currBoard.lists.find(list => list._id === listId);
        const currCard = currList.cards.find(card => card._id === cardId);
        context.commit('setCard', currCard)
      } catch (err) {
        console.log('Coudln\'t get card', err);
      }
    },
    removeCard(context, payload) { // payload {listId, cardId}
      try {
        const currBoard = context.getters.getCurrBoard;
        payload.board = currBoard;
        const modifiedBoard = cardService.removeCard(payload);
        context.dispatch('updateBoard', modifiedBoard)
      } catch (err) {
        console.log('Coudln\'t remove card', err);
      }
    },
    addCard(context, payload) { // payload {listId, title}
      try {
        const currBoard = context.getters.getCurrBoard;
        payload.board = currBoard;
        const modifiedBoard = cardService.addCard(payload);
        context.dispatch('updateBoard', modifiedBoard)
      } catch (err) {
        console.log('Coudln\'t add card', err);
      }
    },
    updateCard(context, card) { // payload {listId, card}
      try {
        const currBoard = context.getters.getCurrBoard;
        const payload = { card, board: currBoard }
        const modifiedBoard = cardService.updateCard(payload);
        context.commit('setCard', card)
        // TODO: emit socket 'update-card'
        context.dispatch('updateBoard', modifiedBoard)
      } catch (err) {
        console.log('Coudln\'t update card', err);
      }
    }
  }
};