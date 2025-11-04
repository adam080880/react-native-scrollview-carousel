# React Native ScrollView Carousel 🎠

A **fully customizable** and **lightweight** carousel for React Native built on top of only `ScrollView`.

---

## 🚀 Installation

```bash
npm install react-native-scrollview-carousel
# or
yarn add react-native-scrollview-carousel
```

## ⚙️ Example Usage

```tsx
import { Carousel } from "react-native-scrollview-carousel";
import { Text, View } from "react-native";

export default function Example() {
  const data = ["A", "B", "C"];

  return (
    <Carousel
      data={data}
      renderItem={(item) => (
        <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 32 }}>{item}</Text>
        </View>
      )}
      withPagination
    />
  );
}
```

| Prop                       | Type                                    | Default        | Description                    |
| -------------------------- | --------------------------------------- | -------------- | ------------------------------ |
| `data`                     | `T[]`                                   | —              | Data array to render           |
| `renderItem`               | `(item: T, index: number) => ReactNode` | —              | Function to render each item   |
| `orientation`              | `"horizontal" \| "vertical"`            | `"horizontal"` | Carousel direction             |
| `onSnapItem`               | `(index: number) => void`               | —              | Callback when item changes     |
| `withPagination`           | `boolean`                               | `false`        | Show pagination dots           |
| `paginationStyle`          | `ViewStyle`                             | —              | Style for pagination container |
| `paginationDotStyle`       | `ViewStyle`                             | —              | Style for each dot             |
| `activePaginationDotStyle` | `ViewStyle`                             | —              | Style for active dot           |

