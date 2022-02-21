import React, {ChangeEvent} from 'react';
import './ParamEditor.css';

export interface Param {
    id: number;
    name: string;
}
interface ParamValue {
    paramId: number;
    value: string;
}
export interface Model {
    [paramValues: string]: ParamValue[];
}
interface Props {
    params: Param[];
    model: Model;
}
export class ParamEditor extends React.Component<Props> {
    public getModel(): Model {
        return this.props.model
    }

    getValue(id: number) {
        const model = this.getModel();
        let value = '';
        for (let key in model) {
            model[key].forEach( (modelValue) => {
            value += modelValue.paramId === id ? modelValue.value : ''
             })
        }
        return value;
    }

    render () {
        return <div>
            {
                this.props.params.map((param) => <ParamValueModel
                        key={param.id}
                        name={param.name}
                        value={this.getValue(param.id)}
                    />)
            }
        </div>

    }
}

interface PropsParamValue {
    name: string,
    value: string
}

class ParamValueModel extends React.Component<PropsParamValue, any> {
    constructor(props: PropsParamValue) {
        super(props);
        this.state = {value: this.props.value};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value});
    }

    render () {
        return <div>
            <label htmlFor='param' className='paramName'>
                {this.props.name}
            </label>
            <input type='text' id='param' value={this.state.value} onChange={this.handleChange}/>
        </div>
    }

}