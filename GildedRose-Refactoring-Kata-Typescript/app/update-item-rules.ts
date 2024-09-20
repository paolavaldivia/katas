import {Rules} from "@/rules";
import {Item} from "@/gilded-rose";

export class UpdateItemRules {

  static updateAgedBrieItem(item: Item) {
    Rules.decreaseSellIn(item);
    Rules.increaseQuality(item);
    Rules.increaseQualityIfSellInDateReached(item)

  }

  static updateSulfuras(_item: Item) {
    // no rules
  }

  static updateBackstagePasses(item: Item) {
    Rules.decreaseSellIn(item);
    Rules.increaseQuality(item);
    Rules.increaseQualityIfLessThan10ToSellIn(item);
    Rules.increaseQualityIfLessThan5ToSellIn(item);
    Rules.dropQualityToZeroIfSellInDateReached(item);
  }

  static updateConjured(item: Item) {
    Rules.decreaseSellIn(item);
    Rules.decreaseQuality(item);
    Rules.decreaseQuality(item);
    Rules.decreaseQualityIfSellInDateReached(item);
    Rules.decreaseQualityIfSellInDateReached(item);
  }

  static updateDefaultItem(item: Item) {
    Rules.decreaseSellIn(item);
    Rules.decreaseQuality(item);
    Rules.decreaseQualityIfSellInDateReached(item);
  }
}
