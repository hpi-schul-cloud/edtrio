import axios from 'axios';
import Api from './../models/Api';

class HttpApi extends Api {
  constructor() {
    super()

    const dataAttr = document.getElementById("root").dataset;

    this.api = axios.create({
      baseURL: dataAttr.api,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.worksheetId = (dataAttr.worksheetId === '' ? null : dataAttr.worksheetId);
  }

  sendData(state) {
      if (this.worksheetId) {
        return this.api.patch(`/${this.worksheetId}`, HttpApi.encode(state))
      }
  }

  getData() {
      return (
        this.worksheetId
          ? this.api.get(`/${this.worksheetId}`).then(result => {
            return HttpApi.decode(result.data)
          })
          : Promise.resolve({})
      );
  }

  static encode({doc, plugin}) {
    return {
      title: doc.title || "Untitled Document",
      content: Object.values(plugin.lookup)
    }
  }

  static decode({title, content}) {
    console.log(content);
    return {
      doc: {
        title
      },
      plugin: {
        active: null,
        lookup: content.reduce((acc, plugin) => ({...acc, [plugin.id]: plugin}), {})
      }
    }
  }
}

export default (new HttpApi());
