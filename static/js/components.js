/**
 * Created by issackelly on 10/6/15.
 */
"use strict";

var Batch = React.createClass({
    displayName: "Batch",

    render: function render() {
        return React.createElement(
            "div",
            { className: "batch", key: this.props.id },
            React.createElement(
                "h4",
                null,
                this.props.data.name
            ),
            React.createElement(
                "p",
                null,
                "Status: ",
                this.props.data.status
            ),
            React.createElement("hr", null)
        );
    }
});

var Batches = React.createClass({
    displayName: "Batches",

    loadFromServer: function loadFromServer() {
        $.post('/api_proxy', JSON.stringify({
            "method": "read_batches"
        }), (function (data, status) {
            console.log('new batches', data);
            this.setState({ data: data });
        }).bind(this), "json");
    },
    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        this.loadFromServer();
    },
    render: function render() {
        if (typeof this.state.data == 'undefined') return React.createElement(
            "p",
            null,
            "Loading Batches..."
        );

        var batchNodes = this.state.data.map(function (batch) {
            return React.createElement(Batch, { key: batch.id, data: batch });
        });

        return React.createElement(
            "div",
            { className: "batches" },
            React.createElement(
                "h2",
                null,
                "Batches"
            ),
            batchNodes
        );
    }
});

var Document = React.createClass({
    displayName: "Document",

    render: function render() {
        return React.createElement(
            "div",
            { className: "document", key: this.props.id },
            this.props.name
        );
    }
});

var Documents = React.createClass({
    displayName: "Documents",

    loadFromServer: function loadFromServer() {
        $.post('/api_proxy', JSON.stringify({
            "method": "read_documents"
        }), (function (data, status) {
            console.log('New Documents', data);
            this.setState({ data: data });
        }).bind(this));
    },
    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        this.loadFromServer();
    },
    render: function render() {
        if (typeof this.state.data == 'undefined') return React.createElement(
            "p",
            null,
            "Loading Templates..."
        );

        var documentNodes = this.state.data.map(function (doc) {
            return React.createElement(Document, { name: doc.name, key: doc.id });
        });

        return React.createElement(
            "div",
            { className: "batches" },
            React.createElement(
                "h2",
                null,
                "Templates"
            ),
            documentNodes
        );
    }
});

$(function () {
    React.render(React.createElement(Batches, null), document.getElementById('batches_list'));

    React.render(React.createElement(Documents, null), document.getElementById('templates_list'));
});