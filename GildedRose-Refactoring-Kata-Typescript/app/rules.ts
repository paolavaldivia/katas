import {Item} from "@/gilded-rose";

export class Rules {
  static deltaQuality = 1 as const;

  static decreaseSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  static decreaseQuality(item: Item) {
    if (item.quality > 0) {
      item.quality = item.quality - Rules.deltaQuality;
    }
  }

  static decreaseQualityIfSellInDateReached(item: Item) {
    if (item.sellIn < 0) {
      Rules.decreaseQuality(item);
    }
  }

  static increaseQuality(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + Rules.deltaQuality;
    }
  }

  static increaseQualityIfLessThan10ToSellIn(item: Item) {
    if (item.sellIn < 10) {
      Rules.increaseQuality(item);
    }
  }

  static increaseQualityIfLessThan5ToSellIn(item: Item) {
    if (item.sellIn < 5) {
      Rules.increaseQuality(item);
    }
  }

  static increaseQualityIfSellInDateReached(item: Item) {
    if (item.sellIn < 0) {
      Rules.increaseQuality(item);
    }
  }

  static dropQualityToZeroIfSellInDateReached(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }
}
