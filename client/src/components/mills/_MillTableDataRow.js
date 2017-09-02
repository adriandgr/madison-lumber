import React, { Component } from 'react';
import Linkify from 'react-linkify';

///////////////////////////////
// Read-only helper components
///////////////////////////////

const StrContent = props => {
  return (
    <td className='content-row'>
      <span>
        <Linkify>{props.content}</Linkify>
      </span>
      {props.isAdmin &&
        <i className='fa fa-pencil' aria-hidden="true" onClick={props.toggleEditable}></i>
      }
    </td>
  );
};

const ArrContent = props => {
  return (
    <td>
      {props.content.map((content, i) => (
        <div key={i} className='content-row'>
          <p key={i + 1} style={{display: 'inline-block', marginBottom: 0}}>
            <Linkify>{content}</Linkify>
          </p>
          {props.isAdmin &&
            <i key={i + 2} className='fa fa-pencil' aria-hidden="true" onClick={props.toggleEditable}></i>
          }
        </div>
      ))}
    </td>
  );
};

const Default = props => {
  console.log(props.contentType)
  return(
    <tr className='mill-table-data-row'>
      <td>{props.sectionName}</td>
      {props.contentType === 'str' ? (
        <StrContent {...props} />
      ) : (
        <ArrContent {...props} />
      )}
    </tr>
  );
};


////////////////////////
// State-ful components
////////////////////////

class Editable extends Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    let content;
    if(this.props.contentType === 'str') {
      this.setState({ content: event.target.value });
    } else {
      this.setState({ content: event.target.value.split(',') });
    }
  }

  handleEdit(event) {
    const contentHasChanged = this.props.content !== this.state.content;
    // Only send request for edit if enter key is pressed, or if the edit button
    // is pressed (onBlur but w/ a relatedTarget), or else, on any other kind of
    // blur, just toggle the editable state. This is a tad irritating/confusing
    // because onBlur is fired before onClick (for the edit button), so catering
    // to onBlur's higher temporal priority is necessary.
    if(event.key === 'Enter' || (event.type === 'blur' && event.relatedTarget === this.submitEdit )) {
      if(contentHasChanged) {
        this.props.handleEdit({ [this.props.millKey]: this.state.content }, this.props.sectionName);
        this.props.onContentUpdate(this.state.content);
      } else {
        this.props.toggleEditable();
      }
    } else if(event.type === 'blur') {
      // If it's any other instance of blur, toggle editable
      this.props.toggleEditable();
    }
  }

  // Positions cursor at end of input on focus
  handleOnFocus(event) {
    let temp = event.target.value;
    event.target.value = '';
    event.target.value = temp;
  }

  render() {
    return(
      <tr className="mill-table-data-row">
        <td>{this.props.sectionName}</td>
        <td>
          <input
            autoFocus
            className='mill-table-data-input'
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            onKeyUp={this.handleEdit}
            onFocus={this.handleOnFocus}
            onBlur={this.handleEdit}>
          </input>
          <button ref={btn => this.submitEdit = btn} className="btn btn-default mill-table-data-btn" onClick={this.handleEdit}>
            <i className="fa fa-check" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    );
  }
}


class MillTableDataRow extends Component {
  constructor(props) {
    super(props);

    let contentType;
    if(Array.isArray(this.props.content)) {
      contentType = 'arr';
    } else {
      contentType = 'str';
    }

    this.state = {
      editable: false,
      content: this.props.content,
      contentType: contentType
    };

    this.toggleEditable = this.toggleEditable.bind(this);
    this.onContentUpdate = this.onContentUpdate.bind(this);
  }

  toggleEditable() { this.setState({ editable: !this.state.editable }); }

  onContentUpdate(content) {
    this.setState({
      content: content,
      editable: !this.state.editable
    });
  }

  render() {
    if(this.props.content[0]) {
      if(this.state.editable) {
        return (
          <Editable
            millKey={this.props.millKey}
            sectionName={this.props.sectionName}
            content={this.props.content}
            toggleEditable={this.toggleEditable}
            onContentUpdate={this.onContentUpdate}
            handleEdit={this.props.handleEdit} />
        );
      } else {
        return (
          <Default
            isAdmin={this.props.isAdmin}
            sectionName={this.props.sectionName}
            content={this.props.content}
            contentType ={this.state.contentType}
            toggleEditable={this.toggleEditable} />
        );
      }
    } else {
      return null;
    }
  }
}

export default MillTableDataRow;