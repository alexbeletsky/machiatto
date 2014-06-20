
  ․․․․․․․․․․․․․


  1 test pending


async spec
[2K[0G  ✓ when reading test.txt it should have content
calc spec
[2K[0G  ✓ when given numbers and add operation it should calculate sum
[2K[0G  ✓ when given numbers and add operation it should calculate sum 2
[2K[0G  ✓ when given another numbers it should calculate sum
  - when given another numbers and add operation it should calculate sum
[2K[0G  ✓ and add operation it should calculate sum
[2K[0G  ✓ when two numbers and add operation it should calculate sum
[2K[0G  ✓ when two numbers and mul operation it should calculate multiplication
empty
[2K[0G  ✓ when nothing it should nothing
hypos spec
[2K[0G  ✓ when setup context and additional setup context it should initalize context.a
[2K[0G  ✓ when setup context and additional setup context it should initalize context.b
[2K[0G  ✓ when setup context and additional setup context it should initalize context.a
[2K[0G  ✓ when setup context and additional setup context it should initalize context.b


  1 test pending

    <section class="suite">
      <h1>async spec</h1>
      <dl>
        <dt>when reading test.txt it should have content</dt>
        <dd><pre><code>expect(content.result).to.equal('message');</code></pre></dd>
      </dl>
    </section>
    <section class="suite">
      <h1>calc spec</h1>
      <dl>
        <dt>when given numbers and add operation it should calculate sum</dt>
        <dd><pre><code>expect(context.result).to.equal(3);</code></pre></dd>
        <dt>when given numbers and add operation it should calculate sum 2</dt>
        <dd><pre><code>expect(context.result).to.equal(3);</code></pre></dd>
        <dt>when given another numbers it should calculate sum</dt>
        <dd><pre><code>expect(context.result).to.equal(undefined);</code></pre></dd>
        <dt>and add operation it should calculate sum</dt>
        <dd><pre><code>expect(isNaN(context.result)).to.be(true);</code></pre></dd>
        <dt>when two numbers and add operation it should calculate sum</dt>
        <dd><pre><code>expect(context.result).equal(8);</code></pre></dd>
        <dt>when two numbers and mul operation it should calculate multiplication</dt>
        <dd><pre><code>expect(context.result).equal(16);</code></pre></dd>
      </dl>
    </section>
    <section class="suite">
      <h1>empty</h1>
      <dl>
        <dt>when nothing it should nothing</dt>
        <dd><pre><code></code></pre></dd>
      </dl>
    </section>
    <section class="suite">
      <h1>hypos spec</h1>
      <dl>
        <dt>when setup context and additional setup context it should initalize context.a</dt>
        <dd><pre><code>expect(context.a).to.equal(1);</code></pre></dd>
        <dt>when setup context and additional setup context it should initalize context.b</dt>
        <dd><pre><code>expect(context.b).to.equal(2);</code></pre></dd>
        <dt>when setup context and additional setup context it should initalize context.a</dt>
        <dd><pre><code>expect(context.a).to.equal(3);</code></pre></dd>
        <dt>when setup context and additional setup context it should initalize context.b</dt>
        <dd><pre><code>expect(context.b).to.equal(4);</code></pre></dd>
      </dl>
    </section>
