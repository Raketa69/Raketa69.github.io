export default class Controller {
    constructor(game, view)
    {
        this.game = game
        this.view = view
        this.isPlaying = false
        this.intervalId = null
        this.timeout = 1000


        document.addEventListener('keydown', this.handleKeyDown.bind(this))
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
        this.view.renderStartScreen();


    }

    updateView()
    {
        const state = this.game.getState()

        if (state.isGameOver) {
            this.view.renderEndScreen(state)
        } else if(!this.isPlaying)
        {
            this.view.renderPauseScreen();
        } else
        {
            this.view.renderMainScreen(state)
        }

    }

    startTimer()
    {
        const speed = this.timeout - this.game.getState().level * 100

        if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100)
        }

    }

    stopTimer()
    {
        if(this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }

    }
    update()
    {
        this.game.movePieceDown();
        this.updateView()
    }



    pause()
    {
        this.isPlaying = false
        this.stopTimer()
        this.updateView()
    }

    play(){
        this.isPlaying = true
        this.startTimer()
        this.updateView()
    }

    reset()
    {
        this.game.reset()
        this.play()
    }
    handleKeyDown(event)
    {
        const state = this.game.getState()
        switch (event.keyCode){
            case 13: //Enter
                if(state.isGameOver)
                {
                    this.reset();
                }
                if(this.isPlaying)
                {
                    this.pause()
                }
                else
                {
                    this.play()
                }
                break;
            case 37: //LEFT ARROW
                this.stopTimer()
                this.updateView()
                game.movePieceLeft()
                break;
            case 38: //UP ARROW
                game.rotatePiece()
                this.updateView()
                break;
            case 39: //RIGHT ARROW
                this.stopTimer()
                game.movePieceRight()
                this.updateView()
                break;
            case 40: //DOWN ARROW
                this.stopTimer()
                game.movePieceDown()
                this.updateView()
                break;

        }
    }

    handleKeyUp(event) {
        switch (event.keyCode){
            case 40: //DOWN ARROW
                this.startTimer();
                break;

            case 37: //LEFT ARROW
                this.startTimer();
                break;

            case 39: //RIGHT ARROW
                this.startTimer();
                break;
        }
    }

}