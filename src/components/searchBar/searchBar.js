import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, TextInput } from 'react-native';
import IconsComponent from '../layout/IconsComponent';

const SearchBar = ({
  query,
  setQuery,
  borderColor,
  textColor,
  placeHolderColor,
  bgColor,
  width,
  iconsColor,
  placeHolder,
}) => {

  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <View style={[styles.container, { width, backgroundColor: bgColor }]}>
      <View style={styles.iconContainer}>
      <IconsComponent name="Search" color={iconsColor} size={18} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: textColor, fontSize: 12 }, !query ? styles.inputFullWidth : styles.inputReducedWidth]}
          placeholder={placeHolder}
          onFocus={() => setIsInputFocused(true)}
          value={query}
          onChangeText={text => setQuery(text)}
          placeholderTextColor={placeHolderColor}
          onBlur={() => setIsInputFocused(false)}

        />
        {query && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <IconsComponent name="X" color={iconsColor} size={18} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  iconContainer: {
    paddingHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '87%',
  },
  input: {
    height: 40,
    fontFamily: 'Raleway', // Make sure you have this font available
  },
  inputFullWidth: {
    width: '100%',
  },
  inputReducedWidth: {
    width: '95%',
  },
});

