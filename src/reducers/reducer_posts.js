import { DELETE_POST, ADD_POST, UPDATE_POST } from '../actions/index'

const initialState = {
  0: {
    id: 0,
    title: 'title1',
    category: 'culture',
    author: 'qq',
    isEdit: false,
    date: '10.02.2018',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  1: {
    id: 1,
    title: 'title2',
    category: 'tech',
    author: 'aa',
    isEdit: false,
    date: '27.05.2018',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  2: {
    id: 2,
    title: 'title3',
    category: 'lifestyle',
    author: 'dd',
    isEdit: false,
    date: '28.05.2018',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_POST:
      const id = action.payload
      const copy = { ...state }
      delete copy[id]
      return { ...copy }

    case ADD_POST:
      return { ...state, [action.payload.id]: action.payload }

    case UPDATE_POST:
      return { ...state, [action.payload.id]: action.payload }

    default:
      return state
  }
}
