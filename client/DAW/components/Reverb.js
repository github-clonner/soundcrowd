import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Checkbox, Select } from 'semantic-ui-react';
import { setTrackReverbGain, toggleTrackReverb, setTrackReverb } from '../project-store/reducers/tracks';

const ReverbModal = (props) => {
  const {
    projectId,
    track,
    setTrackReverbGain,
    toggleTrackReverb,
    setTrackReverb,
    reverbs,
  } = props;
  const reverbOptions = Object.entries(reverbs).map(([key, reverb]) =>
    ({ key, value: key, text: reverb.title }));

  return (
    <Modal trigger={<Button color={track.reverb.on ? 'grey' : ''} size="mini">R</Button>}>
      <Modal.Header>Convolution Reverb (Track {track.id})</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          On:
          <Checkbox
            toggle
            checked={!!track.reverb.on}
            onChange={() => toggleTrackReverb(projectId, track)}
          />
          <label>Gain: </label>
          <input
            type="range"
            value={track.reverb.gain}
            onChange={e => setTrackReverbGain(projectId, track, e.target.value)}
            max={1}
            min={0}
            step={0.01}
          />
          <Select
            placeholder="select reverb"
            options={reverbOptions}
            value={`${track.reverb.id}`}
            onChange={(e, data) => setTrackReverb(projectId, track, data.value)}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const mapState = state => ({
  reverbs: state.reverbs,
});

const mapDispatch = dispatch => ({
  setTrackReverbGain: (projectId, track, newGain) =>
    dispatch(setTrackReverbGain(projectId, track, newGain)),
  toggleTrackReverb: (projectId, track) =>
    dispatch(toggleTrackReverb(projectId, track)),
  setTrackReverb: (projectId, track, reverbId) =>
    dispatch(setTrackReverb(projectId, track, reverbId)),
});

export default connect(mapState, mapDispatch)(ReverbModal);
