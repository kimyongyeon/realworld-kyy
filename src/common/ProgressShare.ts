let progressVal = 0;
class ProgressShare {
  static instance: ProgressShare;

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProgressShare();
      return this.instance;
    }
  }

  setValue(value: number) {
    progressVal = value;
  }

  getValue() {
    return progressVal;
  }
}

const progressShare = ProgressShare.getInstance();
export default progressShare;
