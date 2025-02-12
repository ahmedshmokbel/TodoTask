import { View, Text, CheckBox } from 'react-native';
import React from 'react';
import IconsComponent from '../../layout/IconsComponent';
import Checkbox from '../../checkbox/checkbox';

const TodoCard = React.memo((props) => {
    return (
        <View style={{
            backgroundColor: 'gainsboro',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            borderRadius: 5,
            padding: 10,
            marginVertical: 5
        }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    label={''}
                    checked={props.item.completed}
                    onCheckChange={(newChecked) => props.onPress(props.item)}
                />
                <Text style={{ textDecorationLine: props.completed ? 'line-through' : 'none', maxWidth: '80%' }}>
                    {props.item.title}
                </Text>
            </View>
            <IconsComponent style={{ alignSelf: 'center' }} onPress={() => props.deleteTodo(props.item._id)} name="X" color={'red'} size={20} />
        </View>

    );
});

export default TodoCard;
