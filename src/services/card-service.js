import { makeId } from './util';

function removeCard({ board, listId, cardId }) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const currList = copyBoard.lists.find(list => list._id === listId);
  const cardIdx = currList.cards.findIndex(card => card._id === cardId);
  if (cardIdx === -1) {
    throw new Error(`The card ${cardId} was not found`);
  }
  currList.cards.splice(cardIdx, 1);
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
  return copyBoard;
}

function updateCard({ board, card }) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const currList = copyBoard.lists.find(list => list._id === card.inList.listId);
  const cardIdx = currList.cards.findIndex(c => c._id === card._id);
  if (cardIdx === -1) {
    throw new Error(`The card ${card._id} was not found`);
  }
  currList.cards.splice(cardIdx, 1, card);
  return copyBoard
}

export const cardService = {
  removeCard,
  addCard,
  updateCard,
  getEmptyTodo
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