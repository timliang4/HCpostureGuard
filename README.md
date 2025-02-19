# PostureElevate

#### **Posture Detection Tool using Haar Cascades**

## Link

You can use the tool yourself using this GitHub project's [website](https://timliang4.github.io/HCpostureGuard/).

## How it works

The OpenCV.js library is used to detect a bounding rectangle for your face. HCpostureGuard compares the lower height of this rectangle with a threshold. This threshold is captured by clicking the "Capture Posture" button and sitting in a good posture for 3 seconds. If the rectangle falls below the threshold, your posture is bad.

This mechanism is simple yet effective. The height of your face when you are sitting in a good posture is a product of a straightened back, neck and shoulders, and therefore is a good indicator of your overall posture.

## Usage Example

To capture your posture, first get in a good posture and then click the "Capture Posture" button. A blue line (the threshold for good/bad posture) will appear and follow the lower bound of your face's detection rectangle (don't worry, it will move further down once the capture is complete!)

<img src="images/setup.png" width=360>

Once the posture is completed, the blue line will stop moving and a green "Good Posture" message will appear on the right side.

<img src="images/good_posture.png" width=360>

If your face falls below the blue line, an alert sound will be played and a red "Bad Posture" message will appear on the right side.

<img src="images/bad_posture.png" width=360>

You can always click "Capture Posture" again if you want a new threshold. Feel free to edit the parameters to your liking!

## Support

Encounter an issue?

If you find a bug or have a feature request, please file an issue or email me at timliang4@gmail.com. Or, if you'd like to contribute, feel free to submit a pull request.
