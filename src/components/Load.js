import React from 'react'

class Load extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.timer = null
    this.className = 'load-amap-script'
  }
  componentDidMount() {
    this.loadScript(this.props)
  }
  componentWillReceiveProps(nextProps) {
    const { mapKey, plugin, version } = this.props

    if (
      mapKey !== nextProps.mapKey ||
      plugin !== nextProps.plugin ||
      version !== nextProps.version
    ) {
      this.loadScript(nextProps)
    }
  }
  loadScript(props) {
    const { customLoad, onLoaded } = this.props // 自定义script加载
    const findOldScript = document.querySelector(`.${this.className}`)

    if (customLoad) {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (window.AMap) {
          onLoaded && onLoaded()
          this.setState({ loaded: true })
          clearInterval(this.timer)
        }
      }, 18)
    } else {
      if (findOldScript) {
        findOldScript.parentNode.removeChild(findOldScript)
      }
      this.setState({ loaded: false })
      this.scriptElem = document.createElement('script')
      this.appendScript(props)
    }
  }
  appendScript(props) {
    const { apiUrl, version, mapKey, plugin, onLoaded } = props

    this.scriptElem.onload = () => {
      onLoaded && onLoaded()
      this.setState({ loaded: true })
    }
    this.scriptElem.className = this.className
    this.scriptElem.src = `${apiUrl}?v=${version}&key=${mapKey}&plugin=${getPlugin(
      plugin
    )}`
    document.body.appendChild(this.scriptElem)
  }
  render() {
    const { children } = this.props
    const { loaded } = this.state

    return (
      children(loaded)
    )
  }
}

Load.defaultProps = {
  apiUrl: '//webapi.amap.com/maps'
}

function getPlugin(plugin) {
  if (!plugin || !plugin.length) return ''
  return plugin.join(',')
}

export default Load
