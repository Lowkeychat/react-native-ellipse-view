import React from 'react';
import {
  Platform,
  requireNativeComponent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type EllipseViewProps = {
  borderWidthParam: number | undefined;
  borderColorParam: string | undefined;
  backgroundColorParam: string | undefined;
  borderStyleParam: string | undefined;
};

const EllipseViewManager = requireNativeComponent<EllipseViewProps>(
  'EllipseView'
);

const EllipseView = (props: {
  children: React.ReactNode;
  style?: ViewStyle;
  borderRadius?: number;
}) => {
  const containerStyle = Object.assign({}, props.style);

  if (Platform.OS === 'ios') {
    // Cleanup the container styles
    delete containerStyle.backgroundColor;
    delete containerStyle.borderWidth;
    delete containerStyle.borderColor;

    return (
      <View style={containerStyle}>
        <EllipseViewManager
          children={props.children}
          borderWidthParam={props.style?.borderWidth}
          borderColorParam={props.style?.borderColor}
          backgroundColorParam={props.style?.backgroundColor}
          borderStyleParam={props.style?.borderStyle}
        />
      </View>
    );
  } else {
    return <View {...props} style={[props.style, styles.androidContainer]} />;
  }
};

const styles = StyleSheet.create({
  androidContainer: {
    overflow: 'hidden',
    borderRadius: 10000,
  },
});

export default EllipseView;
