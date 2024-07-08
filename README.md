# HCpostureGuard

#### **Posture Detection Tool using Haar Cascades**

## Link

You can use the tool yourself using this GitHub project's [website](https://timliang4.github.io/HCpostureGuard/)

## How it works

The OpenCV.js library is used to detect a bounding rectangle for your face. HCpostureGuard compares the lower height of this rectangle with a threshold. If lower than the threshold, it determine that your posture is bad. This threshold is captured by clicking the "Capture Posture" button and sitting in a good posture for 3 seconds.

The mechanism is simple yet effective. The height of your face when you are sitting in a good posture is a product of a straightened back, neck and shoulders, and therefore is a good indicator of your overall posture. 

## Usage Example
