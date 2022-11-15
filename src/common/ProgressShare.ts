let progressVal = 0;
class ProgressShare {
  setValue(value: number) {
    progressVal = value;
  }

  getValue() {
    return progressVal;
  }
}

const progressShare = new ProgressShare();
export default progressShare;
