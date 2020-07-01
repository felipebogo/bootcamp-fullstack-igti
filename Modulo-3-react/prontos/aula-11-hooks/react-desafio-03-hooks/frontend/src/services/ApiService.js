export default class ApiService {
  constructor(_url) {
    this.url = _url;
  }

  getVotes = async () => {
    const res = await fetch(`${this.url}/votes`);
    return res.json();
  };
}
