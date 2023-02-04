
declare module '*.mp3' {
    const value: unknown;
    export = value;
}

declare module '*.png' {
    import { ImageSourcePropType } from 'react-native';
    const value: ImageSourcePropType;
    export default value;
}