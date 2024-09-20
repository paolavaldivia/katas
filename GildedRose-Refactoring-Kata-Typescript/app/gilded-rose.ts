import {UpdateItemRules} from "@/update-item-rules";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


interface IGildedRose {
  items: Array<Item>;
  updateQuality(): Array<Item>;
}

export class GildedRose implements IGildedRose {
  items: Array<Item>;
  static agedBrie = 'Aged Brie' as const;
  static sulfuras = 'Sulfuras, Hand of Ragnaros' as const;
  static backstagePasses = 'Backstage passes to a TAFKAL80ETC concert' as const;
  static conjured = 'Conjured' as const;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      GildedRose.updateItemQuality(item);
    }
    return this.items;
  }

  private static updateItemQuality(item: Item) {
    switch (item.name) {
      case GildedRose.agedBrie:
        UpdateItemRules.updateAgedBrieItem(item);
        break;
      case GildedRose.sulfuras:
        UpdateItemRules.updateSulfuras(item);
        break;
      case GildedRose.backstagePasses:
        UpdateItemRules.updateBackstagePasses(item);
        break;
      case GildedRose.conjured:
        UpdateItemRules.updateConjured(item);
        break;
      default:
        UpdateItemRules.updateDefaultItem(item);
        break;
    }
  }
}
