import React, { Component } from 'react';
import axios from 'axios';

class Converter extends Component {
    constructor() {
        super()
        this.state = {
            inpVal: "",
            data: []
        }
    }

    calulate = () => {
        var _this = this;
        _this.state = {
            data: []
        }
        if (_this.state.inpVal == "") {
            alert("Please enter the value");
            return;
        }
        axios.get("https://api.exchangeratesapi.io/latest?base=INR")
            .then(function (result) {
                if (result.status == 200) {
                    if (result.data.rates != undefined) {
                        _this.setState({
                            data: result.data.rates
                        });
                    }
                }
            }).catch(function (e) {
                console.log(e)
            });
    }


    render() {
        return (
            <div className="App">
                <div className="InpSc">
                    <label className="fsize"><b>Currency converter</b></label><br></br><br></br>
                    <label>Enter value:</label>
                    <input type="text" className="inp1" value={this.state.inpVal}
                        onChange={e => this.setState({ inpVal: e.target.value })} /><br></br>
                    <label>Currency:</label>
                    <input type="text" className="inp2" value="INR" readOnly /><br></br>
                    <button type="button" className="button" value="ts" onClick={() => this.calulate()}>Calculate</button>
                </div>
                {this.state.data != "" ? <div className="table">
                    <table>
                        <th className="tbth">Results</th>
                        <tr>
                            <th>Currency</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>CAD</td>
                            <td>{this.state.data.CAD * this.state.inpVal}</td>
                        </tr>
                        <tr>
                            <td>PHP</td>
                            <td>{this.state.data.PHP * this.state.inpVal}</td>
                        </tr>
                        <tr>
                            <td>AUD</td>
                            <td>{this.state.data.AUD * this.state.inpVal}</td>
                        </tr>
                        <tr>
                            <td>GBP</td>
                            <td>{this.state.data.GBP * this.state.inpVal}</td>
                        </tr>
                        <tr>
                            <td>EUR</td>
                            <td>{this.state.data.EUR * this.state.inpVal}</td>
                        </tr>
                    </table>
                </div> : ""}
            </div>
        );
    }
}
export default Converter;
