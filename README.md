## WeTransfer Spinner

### API

#### Spinner
| Prop       | Type             | Required | Default value  |
| ---------- | ---------------- | -------- | -------------- |
| percentage | `number`         | No       | 0              |
| status     | `Sizes`          | No       | 'NOT_STARTED'  |
| size       | `Status`         | No       | 'MEDIUM'       |


```ts
export enum Status {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
};

export enum Sizes {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
};
```

NOTES:

* `percentage` and `status` props have to be updated on the parent level that
uses `Spinner` by passing down these properties to it. `Spinner` will be updated accordingly.
* `size` prop has three size variations which affect the size of spinner itself
as well as other elements accompanied the spinner (such as percentage label).

```tsx
  <Spinner percentage={percentage} status={status} />
```

#### TransferPanel
`TransferPanel` component mimics uploading process and uses `Spinner` component
in order to representing the uploading progress.


### Solution explanation
* `Spinner` component consist of two internal (non-extracting) components: `SpinnerCircleSVG` and `SpinnerLabel`.
This helps to separate the logic and simplify styling management. More sub-components might be added once needed (for example, the final stage for the spinner which will replace the spinner with an image or animation)
* `Spinner` defines `context` with shared props across its subcomponents (`size`, `percentage`, `radius`, `status`)
No passing props needed in this case, what simplifies the extension of this component in the future.
* Usually, it's important to have control over the size of these kinds of components. Three size variations were added in order to have the ability to do this. Sizes definition has to be made along with the design team
* `Status` type was used to control visibility of `Spinner` and stop animation for demonstration purposes. It also effects `TransferPanel` output. In real-world usage, there should not be `PAUSED` status.

### Missed parts
* Styles. Some stylings were extracted from original website when some others were added for a better visual interpretation.
Styles organization might be done in a better way by extracting parts that considered to be common (buttons, fonts, links, etc)
* Accessibility. Accessible roles and other elements have to be added to notify users with disability about the uploading progress
* Uploading details such as remaining time, total, and uploaded size. More metadata might be passed to `TransferPanel` component which will process them and display in a readable way.
* The final stage of the uploading process (animation at the end). "DONE" was shown instead to demonstrate flexibility and the ability to manage uploading states.
* Crossbrowser compatibility. Styling was made based on modern css approaches such as `flexbox` which not supported in every browser. Requirements about supporting browsers usually come from the product. No css extensions were used for the same reason. Interface was tested in __Chrome and Firefox__ only.

### Tech spec
Javascript, React, Typescript, Jest, react-testing-library
