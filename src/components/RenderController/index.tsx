import React, { ReactNode } from 'react';

const StateEmpty: React.FC<any> = (props: any) => props.children;
StateEmpty.displayName = 'StateEmpty';

const StateError: React.FC<any> = (props: any) => props.children;
StateError.displayName = 'StateError';

const StateLoading: React.FC<any> = (props: any) => props.children;
StateLoading.displayName = 'StateLoading';

export interface RenderControllerStateProps {
  hasData: boolean;
  loading: boolean;
  error: boolean;
}

type FCStatic<P> = React.FunctionComponent<P> & {
  StateEmpty: typeof StateEmpty;
  StateError: typeof StateError;
  StateLoading: typeof StateLoading;
};

interface RenderControllerChildren {
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  noDataComponent?: ReactNode;
  dataComponents?: ReactNode[];
}

export const RenderController: FCStatic<RenderControllerStateProps> = ({
  hasData,
  loading,
  error,
  children,
}) => {
  const getChildrenOfRenderController = (): RenderControllerChildren => {
    let loadingComponent: ReactNode | undefined;
    let noDataComponent: ReactNode | undefined;
    let errorComponent: ReactNode | undefined;
    const dataComponents: ReactNode[] = [];
    React.Children.map(children, (child: any) => {
      if (child && child.type) {
        switch (child.type.displayName) {
          case StateLoading.displayName:
            loadingComponent = child;
            break;
          case StateEmpty.displayName:
            noDataComponent = child;
            break;
          case StateError.displayName:
            errorComponent = child;
            break;
          default:
            dataComponents.push(child);
        }
      } else {
        dataComponents.push(child);
      }
    });

    return {
      loadingComponent,
      errorComponent,
      noDataComponent,
      dataComponents,
    };
  };

  const mapChildrenAccordingToPropsValue = ():
    | React.ReactNode
    | null
    | React.ReactNode[] => {
    const {
      loadingComponent,
      errorComponent,
      noDataComponent,
      dataComponents,
    } = getChildrenOfRenderController();

    if (error && !loading && !hasData) {
      return errorComponent;
    }

    if (loading && !hasData) {
      return loadingComponent;
    }

    if (!error && !hasData && !loading) {
      return noDataComponent;
    }

    if (hasData) {
      return dataComponents;
    }

    return null;
  };

  const childrenComponents = mapChildrenAccordingToPropsValue();
  return <>{childrenComponents}</>;
};

RenderController.StateEmpty = StateEmpty;
RenderController.StateError = StateError;
RenderController.StateLoading = StateLoading;
