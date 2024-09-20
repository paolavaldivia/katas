import {Item, GildedRose} from '@/gilded-rose';

const AGED_BRIE = GildedRose.agedBrie;
const SULFURAS = GildedRose.sulfuras;
const BACKSTAGE_PASSES = GildedRose.backstagePasses;
const CONJURED = GildedRose.conjured;


describe('Gilded Rose', () => {
  describe('default items', () => {
    it('should decrease quality by 1', () => {
      const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
    it('should decrease sellIn by 1', () => {
      const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
    });
    it('should degrade quality 2x fast', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 4)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(2);
    });
    it('shouldn\'t decrease quality past 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Gilded Rose: Aged Brie', () => {
    it('should increase quality', () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(1);
    });
    it('should increase quality even after sellIn', () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(3);
    });
    it('shouldn\'t increase quality past 50', () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(50);
    });
  })


  describe('Gilded Rose: Sulfuras', () => {
    const casesSulfuras = [{
      sellIn: 1,
      quality: 1,
      updatedQuality: 1,
    }, {
      sellIn: 80,
      quality: 80,
      updatedQuality: 80,
    }];

    casesSulfuras.forEach(({sellIn, quality, updatedQuality}) => {
      it('shouldn\'t change quality or sellIn', () => {
        const gildedRose = new GildedRose([new Item(SULFURAS, sellIn, quality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(sellIn);
        expect(items[0].quality).toBe(updatedQuality);
      });
    })

  });

  describe('Gilded Rose: Backstage passes', () => {
    const casesQualityBetween5And10 = [{
      sellIn: 10,
      quality: 0,
      updatedQuality: 2,
    }, {
      sellIn: 6,
      quality: 0,
      updatedQuality: 2,
    }];
    const casesQualityBetween1And5 = [{
      sellIn: 5,
      quality: 0,
      updatedQuality: 3,
    }, {
      sellIn: 1,
      quality: 0,
      updatedQuality: 3,
    }];

    casesQualityBetween5And10.forEach(({sellIn, quality, updatedQuality}) => {
        it(`should update quality by 2 when more than 5 and less than 10 days of sellIn`, () => {
          const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, sellIn, quality)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(sellIn - 1);
          expect(items[0].quality).toBe(updatedQuality);
        });
      }
    );
    casesQualityBetween1And5.forEach(({sellIn, quality, updatedQuality}) => {
        it(`should update quality by 2 when more than 5 and less than 10 days of sellIn`, () => {
          const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, sellIn, quality)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(sellIn - 1);
          expect(items[0].quality).toBe(updatedQuality);
        });
      }
    );
    it('shouldn drop quality to 0 when sellIn 0 or less', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
  describe('conjured items', () => {
    it('should update quality for conjured sellin 1 day', () => {
      const gildedRose = new GildedRose([new Item('Conjured', 1, 2)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toBe(0);
      expect(added.sellIn).toBe(0);
    });

    it('should update conjured quality 4x as fast for sellin 0 days', () => {
      const gildedRose = new GildedRose([new Item('Conjured', 0, 4)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toBe(0);
      expect(added.sellIn).toBe(-1);
    });

    it('conjured item quality should never go below 0', () => {
      const gildedRose = new GildedRose([new Item('Conjured', 0, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toBe(0);
      expect(added.sellIn).toBe(-1);
    });
  })
});


