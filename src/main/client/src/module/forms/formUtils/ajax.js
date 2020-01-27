export function get(url, callback, error) {
  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200){callback(this)}
    if(this.readyState === 4 && this.status === 404){error()}
  }
  xmlhttp.open('GET', url, true)
  xmlhttp.send()
}

export function post(url, data, callback, error) {
  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200){callback(this)}
    if(this.readyState === 4 && this.status === 404){error()}
  }

  xmlhttp.open('POST', url, true)
  xmlhttp.setRequestHeader("Content-Type", "application/json")
  console.log(data.toJSON())
  xmlhttp.send(`{\"data\":[${data.toJSON()}]}`)
}

export function put(url, data, callback, error) {
  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) { callback(this) }
    if(this.readyState === 4 && this.status === 404) { error() }
  }

  xmlhttp.open('PUT', url, true)
  xmlhttp.setRequestHeader("Content-Type", "application/json")
  let json_data = data.toJSON()
  xmlhttp.send(`{\"data\":[${json_data}]}`)

}

export function remove(url, data, callback, error) {
  let xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) callback(this)
    if(this.readyState === 4 && this.status === 404) error()
  }

  xmlhttp.open('DELETE', url, true)
  xmlhttp.setRequestHeader("Content-Type", "application/json")
  xmlhttp.send(`{\"data\":[${data.toJSON()}]}`)

}
