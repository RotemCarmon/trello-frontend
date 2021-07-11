import { cardService } from '../../src/services/card-service.js'
import { boardService } from '../../src/services/board-service.js'

describe('Get Card By Id', () => {

  test('returns an object', async () => {
    const [board] = await boardService.getBoards()

    const cardId = 'c104'
    const card = await cardService.getCardById({ board, cardId })
    expect(card).toBeDefined()
  })
  test('returns a card with the right id', async () => {
    const [board] = await boardService.getBoards()

    const cardId = 'c104'
    const card = await cardService.getCardById({ board, cardId })
    expect(card.id).toEqual(cardId)
  })

  test('returns null if id does not exist', async () => {
    const [board] = await boardService.getBoards()

    const cardId = 'x112'
    const card = await cardService.getCardById({ board, cardId })
    expect(card).toBeNull()
  })
})

