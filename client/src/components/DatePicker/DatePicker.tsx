import React from 'react';
import moment from 'moment';
import 'moment/locale/es';


type State = {
  value: any;
}

type Props = {
  label: any;
  format: any;
  onChange: any;
  formatMoment: any;
}

export class DatePicker extends React.Component<Props, State> {

  static defaultProps = {
    label: "Fecha",
    value: new Date(),
    format: 'ddd d, mmm',
    formatMoment: 'ddd D, MMM'
  }

  constructor(props: any) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(props: any) {
    this.state = {
      value: props.value
    };
  }

  componentDidMount() {
    const context = this;

    const elems = document.querySelectorAll('.queso');
    M.Datepicker.init(elems, {
      defaultDate: new Date(),
      format: this.props.format,
      container: 'body',
      onSelect: function (date: any) {
        context.setState({ value: context.state.value });
        context.props.onChange(date);
      },
      autoClose: true
    } as Partial<any>);

  }

  render() {
    return <div className="input-field col s6">
      <i className="material-icons prefix">date_range</i>
      <input id="date" type="text" className="datepicker queso"
             value={moment(this.state.value).locale('es').format(this.props.formatMoment)}
      />
      <label className="active" htmlFor="date">{this.props.label}</label>
    </div>;
  }
}
