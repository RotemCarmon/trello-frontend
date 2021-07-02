import { makeId } from './util-service';
import { boardService } from './board-service'

function removeCard({ board, listId, cardId }) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const currList = copyBoard.lists.find(list => list._id === listId);
  const cardIdx = currList.cards.findIndex(card => card._id === cardId);
  if (cardIdx === -1) {
    throw new Error(`The card ${cardId} was not found`);
  }
  const [removedCard] = currList.cards.splice(cardIdx, 1);
  // Activity
  const activityToAdd = boardService.createActivity({ txt: `deleted a card ${removedCard.title}`, list: currList })
  copyBoard.activities.unshift(activityToAdd)
  return copyBoard
}

function addCard({ board, listId, title }) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const currList = copyBoard.lists.find(list => list._id === listId);
  const newCard = _getEmptyCard();
  newCard.title = title
  newCard.inList = {
    listId: currList._id,
    listTitle: currList.title
  }
  currList.cards.push(newCard)
  // Activity
  const activityToAdd = boardService.createActivity({ txt: `add the card ${newCard.title}`, list: currList, type: 'list' })
  copyBoard.activities.unshift(activityToAdd)
  return copyBoard;
}

function updateCard({ board, listId, card }) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const currList = copyBoard.lists.find(list => list._id === listId);
  const cardIdx = currList.cards.findIndex(c => c._id === card._id);
  if (cardIdx === -1) {
    throw new Error(`The card ${card._id} was not found`);
  }
  currList.cards.splice(cardIdx, 1, card);
  return copyBoard
}

function getCardById({ board, cardId }) {
  let card = null
  board.lists.forEach(list => {
    const currCard = list.cards.find(card => card._id === cardId)
    if (currCard) card = currCard
  })
  return card
}

export const cardService = {
  removeCard,
  addCard,
  updateCard,
  getEmptyTodo,
  getCardById
}

function _getEmptyCard() {
  return {
    _id: 'c' + makeId(),
    createdAt: Date.now(),
    description: '',
    labels: []
  }
}

function getEmptyTodo() {
  return {
    cretaedAt: Date.now(),
    id: makeId(),
    isDone: false,
    txt: ''
  }
}