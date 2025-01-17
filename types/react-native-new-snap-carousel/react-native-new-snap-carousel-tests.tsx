import * as React from 'react';
import {
    LayoutChangeEvent,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StyleSheet,
    Text,
    View,
    ViewStyle, ListRenderItemInfo,
} from 'react-native';
import Carousel, { Pagination, ParallaxImage, AdditionalParallaxProps } from 'react-native-new-snap-carousel';

class StringCarousel<T> extends Carousel<T> {}

class SnapCarouselTest extends React.Component {
    data = ['Item #1', 'Item #2', 'Item #3'];

    renderItem({ item }: ListRenderItemInfo<string>) {
        return (
            <View style={styles.item}>
                <Text>{item}</Text>
            </View>
        );
    }

    render(): React.ReactElement {
        return (
            <View>
                <StringCarousel
                    data={this.data}
                    renderItem={this.renderItem}
                    itemWidth={75}
                    sliderWidth={300}
                    containerCustomStyle={styles.container}
                    enableMomentum={true}
                    keyboardDismissMode="interactive"
                    onSnapToItem={this.onSnapToItem}
                    onBeforeSnapToItem={this.onBeforeSnapToItem}
                    lockScrollTimeoutDuration={900}
                    onScroll={this.onScroll}
                    onLayout={this.onLayout}
                    scrollEndDragDebounceValue={100}
                    vertical={false}
                />
                <StringCarousel
                    data={this.data}
                    renderItem={this.renderItem}
                    itemHeight={75}
                    sliderHeight={300}
                    vertical={true}
                />
            </View>
        );
    }

    private readonly onBeforeSnapToItem = (index: number) => {
        console.log('Before snap to: ', index);
    }

    private readonly onSnapToItem = (index: number) => {
        console.log('Snapped to: ', index);
    }

    private readonly onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log('Scrolled: ', event);
    }

    private readonly onLayout = (event: LayoutChangeEvent) => {
        console.log('Layout: ', event);
    }
}

class SnapCarouselWithPaginationTest extends React.Component<{}, { activeSlide: number }> {
    state = { activeSlide: 0 };

    renderItem({ item }: { item: string }) {
        return (
            <View style={styles.item}>
                <Text>{item}</Text>
            </View>
        );
    }

    render(): React.ReactElement {
        return (
            <View>
                <StringCarousel
                    data={['Item #1', 'Item #2']}
                    renderItem={this.renderItem}
                    itemWidth={75}
                    sliderWidth={300}
                    keyboardDismissMode="interactive"
                    onSnapToItem={index => this.setState({ activeSlide: index })}
                />
                <Pagination
                    dotsLength={2}
                    activeDotIndex={this.state.activeSlide}
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    animatedDuration={250}
                    animatedFriction={4}
                    animatedTension={50}
                    delayPressInDot={0}
                />
            </View>
        );
    }
}

class SnapCarouselWithParallaxTest extends React.Component {
    data = ['Item #1', 'Item #2', 'Item #3'];

    renderParallaxItem({ item }: { item: string }, parallaxProps?: AdditionalParallaxProps) {
        return (
            <ParallaxImage
                source={{ uri: 'http://via.placeholder.com/350x150' }}
                containerStyle={styles.parallaxItem}
                parallaxFactor={0.5}
                showSpinner={true}
                {...parallaxProps}
            />
        );
    }

    render(): React.ReactElement {
        return (
            <View>
                <StringCarousel
                    data={this.data}
                    renderItem={this.renderParallaxItem}
                    itemWidth={75}
                    sliderWidth={300}
                    containerCustomStyle={styles.container}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    } as ViewStyle,
    item: {
        width: 75
    } as ViewStyle,
    parallaxItem: {
        height: 350,
        width: 350
    }
});
