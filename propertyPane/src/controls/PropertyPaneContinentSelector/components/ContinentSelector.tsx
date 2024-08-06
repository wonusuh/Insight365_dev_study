import * as React from "react";
import { Dropdown, IDropdownOption } from "@fluentui/react";
import { IContinentSelectorProps } from "./IContinentSelectorProps";
import { IContinentSelectorState } from "./IContinentSelectorState";

export default class ContinentSelector extends React.Component<
  IContinentSelectorProps,
  IContinentSelectorState
> {
  private selectedKey: React.ReactText;

  constructor(props: IContinentSelectorProps, state: IContinentSelectorState) {
    super(props);
    this.selectedKey = props.selectedKey;
    this.state = { options: [] };
  }

  public componentDidMount(): void {
    this.loadOptions();
  }

  public loadOptions(): void {
    const continents: IDropdownOption[] = [
      { key: "Africa", text: "Africa" },
      { key: "Antarctica", text: "Antarctica" },
      { key: "Asia", text: "Asia" },
      { key: "Australia", text: "Australia" },
      { key: "Europe", text: "Europe" },
      { key: "North America", text: "North America" },
      { key: "South America", text: "South America" },
    ];
    this.setState({ options: continents });
  }

  public render(): JSX.Element {
    return (
      <div>
        <Dropdown
          label={this.props.label}
          disabled={this.props.disabled}
          selectedKey={this.selectedKey}
          options={this.state.options}
          onChanged={this.onChanged.bind(this)}
        />
      </div>
    );
  }

  private onChanged(option: IDropdownOption, index?: number): void {
    // 현재 선택된 항목의 키를 저장합니다.
    this.selectedKey = option.key;

    // 현재 스테이트의 options 배열을 지역변수 options에 저장합니다.
    const options: IDropdownOption[] = this.state.options;

    // 선택되지 않는 모든 항목을 false 로 설정합니다.
    // 즉, 한 번에 하나의 항목만 선택되도록 보장합니다.
    options.forEach((opt: IDropdownOption): void => {
      if (opt.key !== option.key) {
        opt.selected = false;
      }
    });

    // 스테이트를 업데이트합니다. prevState를 기반으로 새로운 상태를 리턴합니다.
    this.setState(
      (
        prevState: IContinentSelectorState,
        props: IContinentSelectorProps
      ): IContinentSelectorState => {
        // prevState의 options를 업데이트된 options로 변경합니다.
        prevState.options = options;
        // 업데이트된 prevState를 리턴합니다.
        return prevState;
      }
    );

    // 만약 props에 onChanged 콜백함수가 정의되어 있다면, 이를호출하여 선택된 항목과 인덱스를 전달합니다.
    if (this.props.onChanged) {
      this.props.onChanged(option, index);
    }
  }
}
