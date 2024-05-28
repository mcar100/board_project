import { AxiosError } from "axios";

class ValidatorAlert extends Error {
  constructor(message, target = null) {
    super(message);
    this.target = target;
  }

  alert() {
    alert(this.message);
  }

  focus() {
    if (!this.target) {
      return;
    }
    this.target.focus();
  }
}

function thrownHandler(thrown) {
  if (thrown instanceof ValidatorAlert) {
    thrown.alert();
    thrown.focus();
  } else if (thrown instanceof AxiosError) {
    console.log(thrown);
    alert(thrown.response.data);
  } else if (thrown instanceof Error) {
    alert(thrown.message);
  } else {
    console.log(thrown);
  }
}

export { ValidatorAlert, thrownHandler };
