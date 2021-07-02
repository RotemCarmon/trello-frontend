import {boardService} from '../../src/services/board-service.js'
  
test('getBoardById returns an object or null', async () => {
  const boardId = 'b101'
  const board = await boardService.getBoardById(boardId)
  expect(board).toBeDefined()
})

test('getBoardById exepts an id and returns one board object or null', async () => {
  const boardId = 'b1031'
  const board = await boardService.getBoardById(boardId)
  console.log('board:', board)
  expect(typeof board === 'object' && !Array.isArray(board) || board === null).toBeTruthy()
})