import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/searchBar/searchBar';
import NoSearchResults from '../../components/emptyLists/noSearchResults';
import TodoCard from '../../components/cards/todos/todoCard';
import { addTodoAction, deleteTodoAction, editTodoAction, getTodosAction } from '../../core/redux/actions/todos.action';

const TodoListScreen = () => {
    const { todosList } = useSelector(state => state.todos);
    const { loading } = useSelector(state => state.todos);
    const [query, setQuery] = useState('');
    const [filteredTodos, setFilteredTodos] = useState(todosList);
    const [newTodo, setNewTodo] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodosAction());
    }, [dispatch]);

    useEffect(() => {
        if (query) {
            const regex = new RegExp(`${query.replace('*', '.*').toLowerCase()}`, 'i');
            const filtered = todosList.filter(todo => regex.test(todo.title.toLowerCase()));
            setFilteredTodos(filtered);
        } else {
            setFilteredTodos(todosList);
        }
    }, [query, todosList]);

    const renderItem = ({ item }) => (
        <TodoCard
            key={item._id}
            item={item}
            onPress={onCheckTodo}
            deleteTodo={deleteTodo}
        />
    );

    const onCheckTodo = (selectedTodo) => {
        const updatedTodo = {
            ...selectedTodo,
            completed: !selectedTodo.completed
        };
        dispatch(editTodoAction({ toDoData: updatedTodo, toDoId: selectedTodo._id })).unwrap().then(res => {

            console.log('fjfjfjfj', res);
            const updatedArray = filteredTodos.map(todo => {
                return todo._id === res._id ? res : todo;
            });
            setFilteredTodos(updatedArray);

        })

    }

    const addNewTodo = () => {
        var todoData = { title: newTodo, completed: false }
        dispatch(addTodoAction({ toDoData: todoData })).unwrap().then(result => {
            if (result === 201) {
                setNewTodo('')
                dispatch(getTodosAction());

            }

        })

    }

    const deleteTodo = (todoId) => {
        dispatch(deleteTodoAction({ todoId: todoId })).unwrap().then(result => {
            if (result === 204) {
                dispatch(getTodosAction());
            }
        })
    }
    return (
        <View style={styles.container}>

            <View style={{ marginHorizontal: 10 }}>
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    placeHolderColor="#80868A"
                    width="100%"
                    iconsColor="#8A8AA3"
                    placeHolder={'Search Todo Title'}
                />
            </View>
            <View style={styles.contentContainer}>
                {loading ?
                    <ActivityIndicator style={{flex:1}}  color={'black'} size={25} />
                    : filteredTodos?.length === 0 ? (
                        <NoSearchResults searchOrEmpty={todosList?.length === 0 ? 'empty' : 'nosearch'} />
                    ) : (
                        <FlatList
                            data={filteredTodos}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            contentInsetAdjustmentBehavior="automatic"
                            initialNumToRender={10}
                        />
                    )}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={addNewTodo}
                    style={styles.addButton}>
                    <Text>Add Todo</Text>
                </TouchableOpacity>
                <TextInput style={styles.input} value={newTodo}
                    onChangeText={(todo) => setNewTodo(todo)}
                    placeholder="Type new todo here..." />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
    },

    contentContainer: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    addButton: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    }
});

export default TodoListScreen;
