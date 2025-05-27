const circleAnimation = {


    init: function () {
        this.elementsSelector()
        this.events()
    },

    elementsSelector: function () {
        this.$circle = document.getElementById('circle')
        this.$circleBackground = document.getElementById('circleBackground')
    },

    events: function () {
        this.$circle.addEventListener('click', this.animations.rippleAnimation.bind(this))

    },

    animations: {

        base: function () {
            return circleAnimation
        },

        createElement: function () {
            const self = this.base()

            const clickAnimation = document.createElement('span')
            clickAnimation.className = 'rippleAnimation'
            clickAnimation.id = 'rippleAnimation'

            self.$circle.appendChild(clickAnimation)
        },

        removeElement: function () {
            const ripple = this.$circle.querySelector('.rippleAnimation')

            if (ripple) {
                ripple.remove()
            }
        },

        rippleAnimation: function (e) {


            this.animations.backgroundAnimation()

            setTimeout(this.animations.removeElement.bind(this), 400)

            this.animations.createElement()

            const circleText = e.target.firstElementChild
            circleText.style.display = 'none'

            const position = this.$circle.getBoundingClientRect()
            const size = Math.max(position.width, position.height)
            const top = e.clientY - position.top - size / 2
            const left = e.clientX - position.left - size / 2

            const $rippleAnimation = document.querySelectorAll('.rippleAnimation')

            $rippleAnimation.forEach((circle) => {
                circle.style.width = `${size}px`
                circle.style.height = `${size}px`
                circle.style.top = `${top}px`
                circle.style.left = `${left}px`
            })
        },

        backgroundAnimation: function () {
            const self = this.base()

            self.$circleBackground.classList.add('rotate')
        },

        resetAnimation: function (e) {
            const self = this.base()
            const circleText = self.$circle.firstElementChild

            self.$circleBackground.classList.remove('rotate')
            circleText.style.display = 'block'
        }

    }
}
const clickCounter = {



    init: function () {
        this.elementsSelector()
        this.addEvents()
    },

    elementsSelector: function () {
        this.$circle = document.getElementById('circle')
        this.$time = document.getElementById('time')
        this.$timers = document.querySelectorAll('.timer')
        this.$previousScore = document.getElementById('previousScore')
        this.$currentScore = document.getElementById('currentScore')
    },

    addEvents: function () {
        const self = this

        window.addEventListener('load', self.events.default_load.bind(self))

        this.$timers.forEach(function (timer) {
            timer.addEventListener('click', self.events.timer_click.bind(self))
        })

        this.$circle.addEventListener('click', this.events.scoreInfo.bind(this), { once: true })

        this.$circle.addEventListener('click', this.events.circle_click.bind(this))


    },

    events: {

        base: function () {
            return clickCounter
        },


        default_load: function (e) {
            const defaultTimer = this.$timers[0]
            defaultTimer.click()
        },

        timer_click: function (e) {

            const timer = e.target
            const list = e.target.parentNode
            const itens = Array.from(list.children)
            const index = itens.indexOf(timer)

            itens.forEach((item) => {
                if (item.classList.contains('selected')) {
                    item.classList.remove('selected')
                }
            })

            timer.classList.add('selected')

            this.seconds

            switch (index) {
                case 0:
                    this.seconds = 2
                    this.events.restartGame()
                    break;
                case 1:
                    this.seconds = 3
                    this.events.restartGame()
                    break;
                case 2:
                    this.seconds = 4
                    this.events.restartGame()

                    break;
            }

            this.$time.innerHTML = `<span>${this.seconds}</span>`

            this.milliseconds = this.seconds * 1000
        },


        circle_click: function (e) {

            this.clicks++

            this.$currentScore.innerHTML = `
                <span>
                    <p>Cliques</p>
                    <p>${this.clicks}</p>
                </span>            
            `
        },

        scoreInfo: function (e) {

            this.clicks = 0
            this.events.timeLeft()

            this.$time.innerHTML = `<span>${this.events.secondsInterval}</span>`

        },

        timeLeft: function () {
            const self = this.base()

            this.secondsInterval = self.seconds

            clearTimeout(this.timeOutId)
            clearInterval(this.intervalId)

            this.intervalId = setInterval(this.timeRemaining.bind(this), 1000)

            this.timeOutId = setTimeout(this.popUp.bind(self), self.milliseconds)

        },

        popUp: function () {
            const self = this

            Swal.fire({
                title: "Bom trabalho!",
                text: `${self.clicks} cliques em ${self.seconds} segundos`,
                icon: "success",
                confirmButtonText: "Salvar",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showDenyButton: true,
                denyButtonText: `Não salvar`
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        title: "Seus pontos foram salvos!",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCancelButton: false,
                        showConfirmButton: false,
                        showDenyButton: true,
                        denyButtonText: "Fechar",

                    });
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: "error",
                        title: "Seus pontos não foram salvos!",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCancelButton: false,
                        showConfirmButton: false,
                        showDenyButton: true,
                        denyButtonText: "Fechar",

                    });
                }
            })

            self.events.restartGame()
        },

        timeRemaining: function () {
            console.log('teste')
            const self = this.base()
            this.secondsInterval--
            self.$time.innerHTML = `<span>${this.secondsInterval}</span>`
        },

        restartGame: function () {
            const self = this.base()

            if (this.timeOutId) {
                self.clicks = 0
                self.events.secondsInterval = self.seconds

                clearTimeout(this.timeOutId)
                clearInterval(this.intervalId)

                this.intervalId = ''

                self.$circle.addEventListener('click', self.events.scoreInfo.bind(self), { once: true })


                self.$currentScore.innerHTML = `
                    <span>
                        <p>Cliques</p>
                        <p>${self.clicks}</p>
                    </span>            
                `
            }
            circleAnimation.animations.resetAnimation()
        }
    }


}


circleAnimation.init()
clickCounter.init()