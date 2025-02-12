import React from 'react';
import { icons } from 'lucide-react-native';

 

const IconsComponent = ({ name, size = 24, color = 'black', fill = 'transparent', style ,onPress}) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in lucide-react-native.`);
    return null;
  }
  return <LucideIcon color={color} size={size} fill={fill} style={style} onPress={onPress} />;

};

export default IconsComponent;
