import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import {
  RenderController,
  RenderControllerStateProps,
} from '../../../components/RenderController/index';

describe('RenderController render child whole tree of components', () => {
  test('renders child with all its hierarchy of components', () => {
    const props = { loading: true, hasData: false, error: false };
    const { getByText, getByTestId } = render(
      <RenderController {...props}>
        <RenderController.StateLoading testID="loading-child">
          <>
            <Text>loading</Text>
            <Text>and</Text>
            <Text>loading...</Text>
            <ActivityIndicator
              testID="indicator"
              size="large"
              color="#0C29D0"
            />
          </>
        </RenderController.StateLoading>
        <View testID="data-child">
          <Text>data</Text>
        </View>
      </RenderController>,
    );
    expect(getByText('loading'));
    expect(getByText('and'));
    expect(getByText('loading...'));
    expect(getByTestId('indicator'));
  });

  test('render controller to not add any new parent to the views but the <></>', () => {
    const props = { loading: false, hasData: true, error: false };
    const { getByText } = render(
      <RenderController {...props}>
        <Text>text1</Text>
        <Text>text2</Text>
        <Text>text3</Text>
      </RenderController>,
    );

    expect(getByText('text1'));
    expect(getByText('text2'));
    expect(getByText('text3'));
  });
});

describe('RenderController without all children', () => {
  test('renders parent view with no child', () => {
    const props = { loading: false, hasData: false, error: false };
    const { getByTestId } = render(
      <View testID="parent">
        <RenderController {...props} />
      </View>,
    );
    expect(getByTestId('parent'));
  });
});

describe('RenderController parent without some children', () => {
  describe.each<[RenderControllerStateProps, boolean]>([
    [{ loading: false, hasData: false, error: true }, true],
    [{ loading: false, hasData: false, error: false }, true],
    [{ loading: true, hasData: false, error: false }, false],
    [{ loading: true, hasData: true, error: false }, false],
  ])(
    'when state is (%s), it should NOT render child? %s)',
    (props, shouldRenderNoChild) => {
      const { queryAllByTestId } = render(
        <View style={{ flex: 1 }}>
          <RenderController {...props}>
            <RenderController.StateLoading>
              <Text testID="child">loading</Text>
            </RenderController.StateLoading>
            <View testID="child">
              <Text>data</Text>
            </View>
          </RenderController>
        </View>,
      );
      const children = queryAllByTestId('child');
      expect(children.length === 0).toBe(shouldRenderNoChild);
    },
  );
});

describe('Renders just one component and with correct child', () => {
  interface ExpectedValues {
    childTextLabel: string;
    renderLoading: boolean;
    renderError: boolean;
    renderEmpty: boolean;
    renderData: boolean;
  }
  test.each<[RenderControllerStateProps, ExpectedValues]>([
    [
      { loading: true, hasData: true, error: true },
      {
        childTextLabel: 'data',
        renderLoading: false,
        renderError: false,
        renderData: true,
        renderEmpty: false,
      },
    ],
    [
      { loading: true, hasData: true, error: false },
      {
        childTextLabel: 'data',
        renderLoading: false,
        renderError: false,
        renderData: true,
        renderEmpty: false,
      },
    ],
    [
      { loading: false, hasData: true, error: true },
      {
        childTextLabel: 'data',
        renderLoading: false,
        renderError: false,
        renderData: true,
        renderEmpty: false,
      },
    ],
    [
      { loading: false, hasData: true, error: false },
      {
        childTextLabel: 'data',
        renderLoading: false,
        renderError: false,
        renderData: true,
        renderEmpty: false,
      },
    ],
    [
      { loading: true, hasData: false, error: true },
      {
        childTextLabel: 'loading',
        renderLoading: true,
        renderError: false,
        renderData: false,
        renderEmpty: false,
      },
    ],
    [
      { loading: true, hasData: false, error: false },
      {
        childTextLabel: 'loading',
        renderLoading: true,
        renderError: false,
        renderData: false,
        renderEmpty: false,
      },
    ],
    [
      { loading: false, hasData: false, error: true },
      {
        childTextLabel: 'error',
        renderLoading: false,
        renderError: true,
        renderData: false,
        renderEmpty: false,
      },
    ],
    [
      { loading: false, hasData: false, error: false },
      {
        childTextLabel: 'empty',
        renderLoading: false,
        renderError: false,
        renderData: false,
        renderEmpty: true,
      },
    ],
  ])('when state is (%s, renders %s)', async (props, expectedValues) => {
    const { queryByText, getByText } = render(
      <View style={{ flex: 1 }}>
        <RenderController {...props}>
          <RenderController.StateLoading>
            <Text>loading</Text>
          </RenderController.StateLoading>
          <RenderController.StateEmpty>
            <Text>empty</Text>
          </RenderController.StateEmpty>
          <RenderController.StateError>
            <Text>error</Text>
          </RenderController.StateError>
          <View>
            <Text>data</Text>
          </View>
        </RenderController>
      </View>,
    );

    const {
      childTextLabel: textLabel,
      renderLoading: loadingVisible,
      renderError: errorVisible,
      renderData: dataVisible,
      renderEmpty: emptyVisible,
    } = expectedValues;

    const loadingChildComponent = queryByText('loading');
    const emptyChildComponent = queryByText('empty');
    const errorChildComponent = queryByText('error');
    const dataChildComponent = queryByText('data');

    expect(getByText(textLabel)).toBeTruthy();
    expect(dataChildComponent !== null).toBe(dataVisible);
    expect(emptyChildComponent !== null).toBe(emptyVisible);
    expect(errorChildComponent !== null).toBe(errorVisible);
    expect(loadingChildComponent !== null).toBe(loadingVisible);
  });
});
