import * as React from "react";
import clsx from "clsx";

import "./index.css";

enum AnimationState {
  inProgress,
  complete,
}

interface IProps {
  className?: string;
  colorClassName?: string;
  barClassName?: string;
  isVisible: boolean;
}

interface IState {
  animation: AnimationState;
}

export class Loader extends React.Component<IProps, IState> {
  private willUnmount: boolean;

  constructor(props: IProps) {
    super(props);

    this.willUnmount = false;

    this.state = {
      animation: props.isVisible
        ? AnimationState.inProgress
        : AnimationState.complete,
    };
  }

  private startAnimation() {
    if (this.willUnmount) {
      return;
    }

    this.setState((state) => ({
      ...state,
      animation: AnimationState.inProgress,
    }));
  }

  private completeAnimation() {
    if (this.willUnmount) {
      return;
    }

    this.setState((state) => ({
      ...state,
      animation: AnimationState.complete,
    }));
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { isVisible } = this.props;
    const { animation } = this.state;

    if (this.willUnmount) {
      return;
    }

    if (prevProps.isVisible === isVisible) {
      return;
    }

    if (isVisible && animation === AnimationState.inProgress) {
      return;
    }

    if (isVisible === false && animation === AnimationState.complete) {
      return;
    }

    isVisible ? this.startAnimation() : this.completeAnimation();
  }

  public componentWillUnmount() {
    this.willUnmount = true;
  }

  public render() {
    const { className, colorClassName, barClassName } = this.props;
    const { animation } = this.state;

    return (
      <div
        className={clsx(
          "transition-opacity duration-500 flex items-center justify-center w-full loader-wrapper overflow-hidden",
          className ? className : "fixed top-0 bottom-0 left-0 right-0",
          colorClassName ? colorClassName : "bg-slate-100",
          animation === AnimationState.complete
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
      >
        <div className="relative flex-1 loader-animation-wrapper">
          <div
            className={clsx(
              "loader-line",
              barClassName ? barClassName : "h-2",
              "bg-slate-300",
              animation === AnimationState.complete
                ? "loader-complete-animation"
                : animation === AnimationState.inProgress
                ? "loader-in-progress-animation rounded-2xl"
                : null
            )}
          />
        </div>
      </div>
    );
  }
}
