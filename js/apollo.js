class Apollo {
  constructor () {

    this.api = 'https://serene-reef-92326.herokuapp.com'

    this.isVisible = false
    this.el = null
    this.isDragging = false
    this.dragStartPosition = null
    this.currentDragPosition = null


    if (this.isTouchDevice()) {
      this.createElement()

      this.request(`${this.api}/ad?publisher=${window.ApolloOptions.publisher}`, (res) => {
        this.showAd(JSON.parse(res))
      })

      this.attachEvents()
    }
  }

  isTouchDevice () {
    return 'ontouchstart' in window
  }

  request (url, callback) {
    try {
  		const x = new (window.XMLHttpRequest || window.ActiveXObject)('MSXML2.XMLHTTP.3.0')
  		x.open('GET', url, 1)
  		x.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  		x.onreadystatechange = function () {
  			x.readyState > 3 && callback && callback(x.responseText, x)
  		}

  		x.send()
  	} catch (e) {
  		window.console && console.log(e)
  	}
  }

  createElement () {
    const bodyStyles = window.getComputedStyle ? getComputedStyle(document.body, null) : document.body.currentStyle
    const bodyMargin = parseInt(bodyStyles['marginLeft'].replace('px', '')) + parseInt(bodyStyles['marginRight'].replace('px', ''))

    this.el = document.createElement('div')

    this.el.style.width = `calc(100% - ${bodyMargin}px)`
    this.el.style.position = 'fixed'
    this.el.style.top = '-300px'
    this.el.style.zIndex = '3000000'
    this.el.style.transition = 'top 500ms ease'
    this.el.style.boxSizing = 'content-box'

    document.body.insertAdjacentElement('beforeend', this.el)
  }

  onTouchStart (e) {
    const y = e.touches[0].clientY

    if (y <= 250 && this.isVisible) {
      this.el.style.transition = ''
      this.isDragging = true
      this.dragStartPosition = y
    }
  }

  onTouchMove (e) {
    const y = e.touches[0].clientY
    const moveTo = this.isDragging ? -1 * (this.dragStartPosition - y) + 10 : null

    this.currentDragPosition = y

    if (moveTo) {
      this.el.style.top = moveTo > 10 ? 10 : moveTo
    }
  }

  onTouchEnd (e) {
    const distance = this.dragStartPosition - this.currentDragPosition

    if (this.isVisible) {
      this.el.style.transition = 'top 200ms ease'
      this.isDragging = false
      this.el.style.top = distance > 50 ? '-300px' : '10px'
      this.isVisible = distance <= 50
    }
  }

  attachEvents () {
    document.body.addEventListener('touchstart', this.onTouchStart.bind(this), false)
    document.body.addEventListener('touchmove', this.onTouchMove.bind(this), false)
    document.body.addEventListener('touchend', this.onTouchEnd.bind(this), false)
  }

  showAd (ad) {
    const html = `<a href="https://serene-reef-92326.herokuapp.com/click?ad=${ad.id}&publisher=${window.ApolloOptions.publisher}" target="_blank" style="display: block; width: 100%; text-decoration: none; font-family: arial, sans-serif; font-size: 16px;">
      <div style="width:calc(100% - 20px); background-color:rgba(224, 227, 230, 1); color:rgb(224,227,230); border-top-right-radius: 10px; border-top-left-radius: 10px; padding: 10px;">
        <div style="width: 20px; float:left; display:inline-block;">
          <img src="${ad.logo}" style="max-width: 100%; max-height: 20px;">
        </div>
        <div style="float: right; width: calc(100% - 30px); color:#000; line-height: 20px;">${ad.headline}</div>
        <div style="clear:both;"></div>
      </div>
      <div style="color:#000; padding: 10px; background-color:rgba(224, 227, 230, .9); border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; fonst-size: 14px;">
        ${ad.subline}
      </div>
    </a>`

    this.el.innerHTML = html

    this.el.style.top = 10
    this.isVisible = true
  }
}

if (typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
) {
  window.Apollo = new Apollo()
}
