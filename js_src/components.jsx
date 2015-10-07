/**
 * Created by issackelly on 10/6/15.
 */
var Batch = React.createClass({
    render: function() {
        return (
          <div className="batch" key={ this.props.id }>
              <h4>{ this.props.data.name }</h4>
              <p>Status: { this.props.data.status }</p>
              <hr/>
          </div>
        );
      }
});

var Batches = React.createClass({
    loadFromServer: function(){
      $.post('/api_proxy', JSON.stringify({
        "method": "read_batches"
      }), function(data, status){
        console.log('new batches', data);
        this.setState({data:data});
      }.bind(this), "json");
    },
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        this.loadFromServer();
    },
    render: function(){
        if (typeof(this.state.data) == 'undefined') return (<p>Loading Batches...</p>);

        var batchNodes = this.state.data.map(function(batch){
          return (<Batch key= {batch.id} data={batch} />)
        });

        return (
            <div className="batches">
                <h2>Batches</h2>
                { batchNodes }
            </div>
        )
    }
});

var Document = React.createClass({
    render: function() {
        return (
          <div className="document" key={ this.props.id }>
              { this.props.name }
          </div>
        );
      }
});

var Documents = React.createClass({

    loadFromServer: function() {
        $.post('/api_proxy', JSON.stringify({
            "method": "read_documents"
        }), function (data, status) {
            console.log('New Documents', data);
            this.setState({data: data})
        }.bind(this))
    },
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        this.loadFromServer();
    },
    render: function(){
        if (typeof(this.state.data) == 'undefined') return (<p>Loading Templates...</p>);

        var documentNodes = this.state.data.map(function(doc){
          return (<Document name={doc.name} key={doc.id} />)
        });

        return (
            <div className="batches">
                <h2>Templates</h2>
                { documentNodes }
            </div>
        )
    }
});

$(function(){
    React.render(
      <Batches />, document.getElementById('batches_list')
    );

    React.render(
      <Documents />, document.getElementById('templates_list')
    );
});