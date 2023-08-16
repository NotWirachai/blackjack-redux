import { all } from 'redux-saga/effects'
import blackjack from './blackjack'

export default function* rootSaga() {
  yield all([
    blackjack()
  ])
}
