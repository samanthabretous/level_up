import React, { PropTypes } from 'react';
import moment from 'moment';
import { Accordion } from 'semantic-ui-react';

const DisplayInterviewDetails = props => (
  <Accordion key={props.id}>
    <Accordion.Title>{props.phrase}: {props.content + props.type}</Accordion.Title>
    <Accordion.Content>
      <p>Code Challenge: {props.codeChallenge}</p>
      <p>Code Challenge Notes: {props.codeChallengeNotes}</p>
      <p>props Date: {`${moment(props.when).format('MMM Do YY')} @ ${props.time}`}</p>
      <p>Feed Back: {props.feedBack}</p>
      <p>Thank You: {props.thankYou ? 'You\'re Welcome!' : 'Oh Girl! Send that note.'}</p>
      <p>Reminder: {moment(props.reminder).format('MMM Do')}</p>
      <p>Reminder Notes: {props.reminderNotes}</p>
      <h4>Interviewer: {_.map(props.contacts, contact =>
        <p key={contact.id}>{contact.name}</p>)}
      </h4>
    </Accordion.Content>
  </Accordion>
);

DisplayInterviewDetails.propTypes = {
  id: PropTypes.number.isRequired,
  phrase: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  codeChallenge: PropTypes.bool.isRequired,
  codeChallengeNotes: PropTypes.string,
  when: PropTypes.string.isRequired,
  time: PropTypes.string,
  feedBack: PropTypes.string,
  thankYou: PropTypes.bool.isRequired,
  reminder: PropTypes.string.isRequired,
  reminderNotes: PropTypes.string,
  // contacts: PropTypes.arrayOf(PropTypes.object),
};

DisplayInterviewDetails.defaultProps = {
  codeChallengeNotes: null,
  time: null,
  feedBack: null,
  reminderNotes: null,
  // contacts: null,
};

export default DisplayInterviewDetails;
