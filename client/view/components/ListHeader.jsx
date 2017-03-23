import React from 'react';
import { Table } from 'semantic-ui-react';

const ListHeader = () => (
  <Table.Header color="blue">
    <Table.Row>
      <Table.HeaderCell>Rank</Table.HeaderCell>
      <Table.HeaderCell>Company</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Last Updated</Table.HeaderCell>
      <Table.HeaderCell>Created At</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default ListHeader;
