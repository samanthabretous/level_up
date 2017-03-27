// <Grid.Row>
//   <Step.Group>
//     {application && _.map(statusOptions, status => (
//       <Step
//         key={status.value}
//         active={status.value === JSON.parse(application.status)}
//         completed={status.value < application.status}
//         icon={status.icon}
//         title={status.title}
//       />
//     ))}
//   </Step.Group>
// </Grid.Row>
// <Grid.Row>
//   <AppMainInfo {...application} />
//   <Grid.Column width={10}>
//     <Grid.Row>
//       <Segment.Group stacked horizontal>
//         <Segment>Last Updated: {moment(application.updatedAt).calendar()}</Segment>
//         <Segment>Created At: {moment(application.createdAt).format('MMM Do YY')}</Segment>
//       </Segment.Group>
//     </Grid.Row>
//     <Grid.Row>
//       <Statistic.Group widths="two">
//         <Statistic>
//           <Statistic.Value>
//             <h1>Date Applied</h1>
//             <Icon name="checked calendar" />
//             {application.dateApplied}
//           </Statistic.Value>
//         </Statistic>
//         <Statistic>
//           <Statistic.Value>
//             <h1>Sent Cover Letter</h1>
//             <Icon
//               name={application.coverLetter ? 'check' : 'cancel'}
//               color={application.coverLetter ? 'green' : 'red'}
//             />
//             {application.coverLetter}
//           </Statistic.Value>
//         </Statistic>
//       </Statistic.Group>
//     </Grid.Row>
//   </Grid.Column>
// </Grid.Row>
// <Grid.Row>
//   <Grid.Column>
//     {_.map(application.contacts, contact => (
//
//     ))}
//   </Grid.Column>
//   <Grid.Column width={10}>
//     <Accordion styled>
//       {_.map(application.interviews, interview => (
//         
//       ))}
//     </Accordion>
//   </Grid.Column>
// </Grid.Row>
