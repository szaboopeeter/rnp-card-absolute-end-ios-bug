# rnp-card-absolute-end-ios-bug
Demonstration of absolute positioning bug in react-native-paper on iOS

## Building / running the project

The project was set up using the command `npx react-native init CardBug --template react-native-template-typescript`, and should be runnable with the standard `npx react-native start` + `npx react-native run-ios` commands. Please follow the official React Native [docs](https://reactnative.dev/docs/environment-setup) to set up your development environment if you haven't worked with React Native before.

## Purpose

The purpose of this repo is to demonstrate a bug in the current version (5.1.0) of [react-native-paper](https://github.com/callstack/react-native-paper) on iOS.

### Bug description

Using a `<Card>` component and `absolute`-positioning it relative to the `start` or `end` of it's parent doesn't work as expected. It will position relative to an `AnimatedContentWrapper` component which is an implementation detail of `react-native-paper`.

Note: Positioning with `right` or `left` as opposed to `start` or `end` works as intended, as well as `start` and `and` working as intended on Android and Web.


### How to reproduce?

Simplest repro would be to just have a `<Card style={{position: "absolute", end: 0}}>` inside a `<View>`, for example.

[App.ts](https://github.com/szaboopeeter/rnp-card-absolute-end-ios-bug/blob/main/CardBug/App.tsx) contains such a setup - with slightly more styling for better visibility.

The expected behavior in this case (assuming LTR layout) is for the `<Card>` to be right-aligned.
Please refer to the docs: https://reactnative.dev/docs/layout-props#end
<br/>The behavior should be identical to what happens with right alignment.

<img src="https://raw.githubusercontent.com/szaboopeeter/rnp-card-absolute-end-ios-bug/main/BugDescriptionAssets/right-aligned-card.png" width="600" alt="Demonstration of working right-alignment"/>

The actual behavior is that the `<Card>` stays left-aligned, and some of the internal card hierarchy gets right-aligned relative to it's parent.

<img src="https://raw.githubusercontent.com/szaboopeeter/rnp-card-absolute-end-ios-bug/main/BugDescriptionAssets/end-aligned-card.png" width="600" alt="Demonstration of buggy end-alignment"/>

### Initial analysis

I was able to track this down to the current implementation of the `<Surface>` component for iOS in `react-native-paper`, where some of the relevant properties are skipped from `absoluteStyles`, and only later attached to the component hierarchy as `restStyle`: https://github.com/callstack/react-native-paper/blob/v5.1.0/src/components/Surface.tsx#L224

This causes the `<AnimatedComponentWrapper>` in the component hierarchy to drop the `end` style that was passed to the `Card`. See the style props of the component on screenshot below:

<img src="https://raw.githubusercontent.com/szaboopeeter/rnp-card-absolute-end-ios-bug/main/BugDescriptionAssets/end-aligned-wrapper.png" width="600" alt="Demonstration of buggy end-alignment causing AnimatedComponentWrapper to drop the end property"/>