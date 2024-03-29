import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { StyledLink } from "./CommonComponents";
import styled from "styled-components";

@inject("liquorStore")
@observer
class Results extends Component {
  state = {};
  componentDidMount() {
    this.props.liquorStore.fetchRequests();
  }

  toggle = key => {
    this.setState({
      [key]: !this.state[key]
    });
  };

  renderRequest = ({ sessionId, name, beer, quantity }) => (
    <StyledRow
      key={`${name}-${beer}`}
      crossed={this.state[`${sessionId}-${name}`]}
    >
      <TableCell>
        {beer} X {quantity}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Button
          variant="raised"
          onClick={() => this.toggle(`${sessionId}-${name}`)}
        >
          Toggle
        </Button>
      </TableCell>
    </StyledRow>
  );
  render() {
    const { todays } = this.props.liquorStore;

    return (
      <div>
        {todays ? (
          <Table style={{ maxWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Beer</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{todays.map(this.renderRequest)}</TableBody>
          </Table>
        ) : (
          <div>loading...</div>
        )}
        <StyledLink to="/">Edit your beer</StyledLink>
        <StyledLink to="/beers">Beer List</StyledLink>
      </div>
    );
  }
}

const StyledRow = styled(TableRow)`
  text-decoration: ${({ crossed }) => (crossed ? "line-through" : "")};
`;

export default Results;
