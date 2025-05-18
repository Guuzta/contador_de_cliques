const circleAnimation = {

    init: function () {
        this.elementsSelector()
        this.events()
        this.animations

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


    }

}

circleAnimation.init()