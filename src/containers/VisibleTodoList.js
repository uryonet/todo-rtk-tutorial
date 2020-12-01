import { connect } from 'react-redux'
import { createselector } from '@reduxjs/toolkit'
import { toggleTodo } from 'features/todos/todosSlice'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

const selectTodos = state => state.todos
const selectFilter = state => state.visibilityFilter
const selectVisibleTodos = createselector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }
)

const mapStateToProps = (state) => ({
  todos: selectVisibleTodos(state)
})

const mapDispatchToProps = { toggleTodo }

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
