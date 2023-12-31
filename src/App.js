import React, { useEffect } from 'react';
import Phaser from 'phaser';
import './App.css';

function App() {
  
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game-container',
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        let game = new Phaser.Game(config);
        let startText, enterText, countdownText;
        let countdown = 5;
        let isCountingDown = false;
        let pulsing = false;

        function preload() {
            this.load.image('homeScreen', 'background.png');
        }

        function create() {
            this.add.image(400, 300, 'homeScreen');

            const textStyle = {
                fontSize: '40px',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: 20,
                align: 'center'
            };

            const titleStyle = {
              fontSize: '48px',
              fontFamily: 'Arial',
              color: '#ffffff',
              align: 'center'
          };
      
          this.add.text(this.cameras.main.centerX, 20, 'Majestic Game', titleStyle).setOrigin(0.5, 0);
      

            startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY / 2, 'Welcome', textStyle);
            startText.setOrigin(0.5, 0.5).setInteractive();

            enterText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY / 2 + 60, 'Press Enter to Start', textStyle);
            enterText.setOrigin(0.5, 0.5);

            countdownText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '', textStyle);
            countdownText.setOrigin(0.5, 0.5).setVisible(false);

            startText.on('pointerdown', startCountdown);
            enterText.on('pointerdown', startCountdown);
            this.input.keyboard.on('keydown-ENTER', startCountdown);
        }

        function update() {
            if (!pulsing && !isCountingDown) {
                pulsing = true;
                this.tweens.add({
                    targets: [startText, enterText],
                    scaleX: 1.1,
                    scaleY: 1.1,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut',
                    duration: 800
                });
            }

            if (isCountingDown) {
                countdownText.setText(`Starting in: ${countdown}`);
            }
        }

        function startCountdown() {
            if (!isCountingDown) {
                isCountingDown = true;
                startText.setVisible(false);
                enterText.setVisible(false);
                countdownText.setVisible(true);

                const timer = setInterval(() => {
                    countdown -= 1;
                    if (countdown <= 0) {
                        clearInterval(timer);
                        startGame();
                    }
                }, 1000);
            }
        }

        function startGame() {
          console.log('Starting game!');
          countdownText.setVisible(false);

          // Create an input field for the player's name
          var playerName = prompt("Please enter your name:");

          // Create a confirm dialog for the difficulty level
          var difficultyLevel = window.confirm("Select OK for easy level, Cancel for hard level.") ? "easy" : "hard";

          // Placeholder for game start logic
          console.log('Game started by player:', playerName, 'with difficulty level:', difficultyLevel);
        }

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
      <div>
          <div id="phaser-game-container" className="phaser-container"></div>
      </div>
  );
}

export default App;
